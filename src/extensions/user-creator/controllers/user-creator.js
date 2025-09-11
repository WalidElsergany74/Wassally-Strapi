module.exports = {
    async create(ctx) {
      try {
        const { email, username, password, role } = ctx.request.body;
  
        if (!email || !username || !password || !role) {
          ctx.status = 400;
          ctx.body = { error: 'email, username, password, and role are required' };
          return;
        }
  
        // ابحث عن الـ role المطلوب
        const roleEntity = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: { type: role },
        });
  
        if (!roleEntity) {
          ctx.status = 400;
          ctx.body = { error: 'Invalid role' };
          return;
        }
  
        // إنشاء يوزر جديد
        const newUser = await strapi
          .plugin('users-permissions')
          .service('user')
          .add({
            email,
            username,
            password,
            role: roleEntity.id,
            confirmed: true,
          });
  
        ctx.status = 201;
        ctx.body = {
          status: 'success',
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: roleEntity.name,
          },
        };
      } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Something went wrong', details: err.message };
      }
    },
  };
  