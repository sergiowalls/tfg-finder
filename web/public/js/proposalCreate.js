(() => {
  window.submitFormDelegate = function() {
    const json = {
      title: $('#title').val(),
      description: $('#description').val(),
      goals: window.goals,
      keywords: window.keywords
    };

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/proposals',
      contentType: 'application/json',
      data: json,
      success: () => {
        window.location.href = "http://localhost:3001/";
      }
    })
  }
})();