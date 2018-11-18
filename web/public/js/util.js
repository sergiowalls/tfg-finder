(() => {
  var TFGFinder = {};
  window.TFGFinder = TFGFinder;

  TFGFinder.Resources = {};
  TFGFinder.Resources.UserEmail = 'student@test.com';

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
      default:
        return ''
    }
  }

  TFGFinder.Util.getStateColor = (state) => {
    switch(state) {
      case 'proposed':
        return 'grey'
      case 'modified':
        return 'orange'
      case 'pending':
        return 'red'
      case 'finished':
        return 'green'
      default:
        return '';
    }
  }
})();