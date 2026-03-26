const db = require('../models');
const { Op } = require('sequelize');
const BlogPost = db.BlogPost;
const User = db.User;

// Get all blog posts with pagination and filters
exports.getAllPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category = '',
      status = '',
      author_id = '',
      is_featured = ''
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Search filter
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    // Status filter - if user is not admin, only show published posts
    if (status) {
      where.status = status;
    } else if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      where.status = 'published';
    }

    // Author filter
    if (author_id) {
      where.author_id = author_id;
    }

    // Featured filter
    if (is_featured !== '') {
      where.is_featured = is_featured === 'true';
    }

    const { count, rows: posts } = await BlogPost.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error.message
    });
  }
};

// Get single blog post by ID or slug
exports.getPostByIdOrSlug = async (req, res) => {
  try {
    const { identifier } = req.params;

    const where = isNaN(identifier)
      ? { slug: identifier }
      : { id: parseInt(identifier) };

    const post = await BlogPost.findOne({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url', 'bio']
        }
      ]
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views count
    await post.increment('views_count');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
};

// Create new blog post
exports.createPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category,
      tags,
      status,
      is_featured,
      meta_title,
      meta_description
    } = req.body;

    // Only admins and trainers can create blog posts
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin' && req.user.role !== 'trainer') {
      return res.status(403).json({
        success: false,
        message: 'Only admins and trainers can create blog posts'
      });
    }

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author_id: req.user.id,
      category,
      tags,
      status: status || 'draft',
      is_featured: is_featured || false,
      meta_title,
      meta_description
    });

    const createdPost = await BlogPost.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: createdPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
};

// Update blog post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category,
      tags,
      status,
      is_featured,
      meta_title,
      meta_description
    } = req.body;

    const post = await BlogPost.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Only author or admins can update
    if (post.author_id !== req.user.id && req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own blog posts'
      });
    }

    await post.update({
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category,
      tags,
      status,
      is_featured,
      meta_title,
      meta_description
    });

    const updatedPost = await BlogPost.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
};

// Delete blog post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Only author or admins can delete
    if (post.author_id !== req.user.id && req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own blog posts'
      });
    }

    await post.destroy();

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
};

// Publish blog post
exports.publishPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Only author or admins can publish
    if (post.author_id !== req.user.id && req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only publish your own blog posts'
      });
    }

    await post.update({
      status: 'published',
      published_at: new Date()
    });

    res.json({
      success: true,
      message: 'Blog post published successfully',
      data: post
    });
  } catch (error) {
    console.error('Publish post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error publishing blog post',
      error: error.message
    });
  }
};

// Get blog categories (unique categories)
exports.getCategories = async (req, res) => {
  try {
    const categories = await BlogPost.findAll({
      attributes: [
        'category',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      where: {
        category: {
          [Op.ne]: null
        }
      },
      group: ['category'],
      order: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'DESC']]
    });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// Get featured posts
exports.getFeaturedPosts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const posts = await BlogPost.findAll({
      where: {
        is_featured: true,
        status: 'published'
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name', 'avatar_url']
        }
      ],
      limit: parseInt(limit),
      order: [['published_at', 'DESC']]
    });

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured posts',
      error: error.message
    });
  }
};
