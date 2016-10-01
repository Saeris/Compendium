export class App {
  configureRouter(config, router) {
    config.title = 'Compendium';
    config.options.root = '/';
    config.map([
      { route: [''], name: 'home', moduleId: './app/routes/home/home', nav: true, title: 'Home'}
    ]);
    this.router = router;
  }
}
