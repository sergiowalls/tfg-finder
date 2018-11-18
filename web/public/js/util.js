(() => {
  var TFGFinder = {};
  window.TFGFinder = TFGFinder;

  TFGFinder.DataAccess = {};

  TFGFinder.Util = {};

  TFGFinder.Util.getDataAccess = (name) => {
    const mock = true;
    const className = name + (mock ? 'Mock' : '');
    console.log(className);
    let result = new TFGFinder.DataAccess[className]();
    return result;
  };

  TFGFinder.Util.translateState = (state) => {
    switch(state) {
      case 'proposed':
        return 'proposat'
      case 'modified':
        return 'en proc&eacute;s'
      case 'pending':
        return 'pendent de val.'
      case 'finished':
        return 'finalitzat'
    }
  }
})();