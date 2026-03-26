module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    featured_image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'draft'
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    views_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    meta_title: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: true,
    hooks: {
      beforeValidate: (post) => {
        if (post.title && !post.slug) {
          // Auto-generate slug from title
          post.slug = post.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }
      },
      beforeUpdate: (post) => {
        if (post.changed('status') && post.status === 'published' && !post.published_at) {
          post.published_at = new Date();
        }
      },
      beforeCreate: (post) => {
        if (post.status === 'published' && !post.published_at) {
          post.published_at = new Date();
        }
      }
    }
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'author_id',
      as: 'author'
    });
  };

  return BlogPost;
};
