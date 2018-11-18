(() => {
  const proposalId = parseInt(window.location.pathname.split("/").pop());

  const dataAccess = TFGFinder.Util.getDataAccess('Api');
  dataAccess.getProposalById(proposalId)
    .then(proposal => {
      renderTitle(proposal.title);
      renderState(proposal.state);
      renderProposer(proposal.proposer.name);
      renderProposerRole(proposal.proposer.role);
      renderKeywords(proposal.keywords);
      renderDescription(proposal.description);
      renderObjectives(proposal.objectives);
    });
  dataAccess.getProposalHistory(proposalId)
    .then(proposalHistory => renderHistory(proposalHistory));

  const renderTitle = (title) => {
    $('#detail-title').html(title);
  };

  const renderState = (state) => {
    var html = '';
    var stateClass = '';
    switch(state) {
      case 'proposed':
        html = 'proposat'
        stateClass = 'grey'
        break;
      case 'modified':
        html = 'en proc&eacute;s'
        stateClass = 'yellow'
        break;
      case 'pending':
        html = 'pendent de validaci&oacute;'
        stateClass = 'red'
        break;
      case 'finished':
        html = 'finalitzat'
        stateClass = 'green'
        break;
    }
    $('#detail-state').html(html);
    $('#detail-state').addClass(stateClass);
  };

  const renderProposer = (proposer) => {
    $('#detail-proposer').html(proposer);
  };

  const renderProposerRole = (role) => {
    var roleTranslated = '';
    switch (role) {
      case 'student':
        roleTranslated = 'estudiant'
        break;
      case 'professor':
        roleTranslated = 'professor'
        break;
    }
    $('#detail-role').html(roleTranslated);
  };

  const renderKeywords = (keywords) => {
    let html = '';
    keywords.forEach(keyword => {
      html = html + '<div class="chip">' + keyword + '</div>';
    });
    $('#detail-keywords').html(html);
  };

  const renderDescription = (description) => {
    $('#detail-description').html(description);
  };

  const renderObjectives = (objectives) => {
    let html = '';
    objectives.forEach(objective => {
      html = html + '<li class="collection-item">' + objective + '</li>';
    });
    $('#detail-objectives').html(html);
  };

  const renderHistory = (history) => {

  };
})();