(() => {
  TFGFinder.DataAccess.ApiMock.getProposals()
    .then(proposals => {
      var data = proposals.map((proposal) => {
        return [
          proposal.title,
          proposal.proposer.name,
          proposal.keywords.join(', ')
        ]
      });
      var table = $('#test-table').DataTable( {
        data: data,
        columns: [
            { title: "Title" },
            { title: "Proposer" },
            { title: "Keywords" }
        ]
      });
    
      $("select").val('10');
      $('select').addClass("browser-default");

      $('#test-table tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        window.location.href = '/proposals/' + data[0];
      } );
    });
})();