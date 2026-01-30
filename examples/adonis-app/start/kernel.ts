import router from '@adonisjs/core/services/router';

router.use([() => import('adonis-intlayer/middleware')]);
