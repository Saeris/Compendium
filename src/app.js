export class App {
  configureRouter(config, router) {
    config.title = 'Compendium';
    config.options.root = '/';
    config.map([
      { route: [''], name: 'home', moduleId: './app/routes/home/home', nav: true, title: 'Home'},
      { route: ['test'], name: 'test', moduleId: './app/routes/test/test', nav: true, title: 'Test'}
    ]);
    this.router = router;
  }
}
