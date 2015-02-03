Router.configure({
  loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});
