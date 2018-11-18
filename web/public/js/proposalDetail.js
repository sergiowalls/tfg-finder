(() => {
  const proposalId = parseInt(window.location.pathname.split("/").pop());

  const dataAccess = TFGFinder.Util.getDataAccess('Api');
  dataAccess.getProposalById(proposalId)
    .then(proposal => {
      renderTitle(proposal.title);
      renderState(proposal.state);
      renderProposer(proposal.proposer);
      renderProposerRole(proposal.proposer.role);
      renderKeywords(proposal.keywords);
      renderDescription(proposal.description);
      renderObjectives(proposal.goals);
      renderObjectives(proposal.objectives);

      let btn = document.getElementById('accept-button');
      // proposal = document.getElementById('')
      if (localStorage.getItem('user') == proposal.proposer)
          btn.style.visibility = 'hidden'
    });
  dataAccess.getProposalHistory(proposalId)
    .then(proposalHistory => renderHistory(proposalHistory));

  const renderTitle = (title) => {
    $('#detail-title').html(title);
  };

  const renderState = (state) => {
    var html = TFGFinder.Util.translateState(state);
    var stateClass = '';
    switch(state) {
      case 'proposed':
        stateClass = 'grey'
        break;
      case 'modified':
        stateClass = 'orange'
        break;
      case 'pending':
        stateClass = 'red'
        break;
      case 'finished':
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
    let html = '';
    history.reverse();
    for (var i = 0; i < history.length; i++) {
      const current = history[i];
      const previous = i > 0 ? history[i-1] : null;
      const differences = getDifferences(current, previous);
      const title = i === 0 ? 'Proposta creada' : `Modificaci&oacute;: ${differences[0].field}`;
      const icon = i === 0 ? 'add' : (current.state === 'finished' ? 'check' : 'folder');
      const iconColor = i === 0 ? 'orange' : (current.state === 'finished' ? 'green' : '');
      const userHtml = current.user + (current.user === current.proposer.email ? ' <strong>(proposador)</strong>' : '');

      let stateHtml = '';
      if (previous !== null) {
        const currentStateTranslated = TFGFinder.Util.translateState(current.state);
        const currentStateColor = TFGFinder.Util.getStateColor(current.state);
        const previousStateTranslated = TFGFinder.Util.translateState(previous.state);
        const previousStateColor = TFGFinder.Util.getStateColor(previous.state);

        stateHtml = `
          <div><span class="new badge ${currentStateColor}" data-badge-caption="">${currentStateTranslated}</span></div>
          <div class="separator-arrow"><i class="material-icons">keyboard_arrow_up</i></div>
          <div><span class="new badge ${previousStateColor}" data-badge-caption="">${previousStateTranslated}</span></div>
        `;
      }
      
      const rowHtml = `
        <li class="collection-item avatar">
          <i class="material-icons circle ${iconColor}">${icon}</i>
          <span class="title">${title}</span>
          <p>${userHtml} <br>
            10/03/2018 08:22
          </p>
          <div class="secondary-content">
            ${stateHtml}
          </div>
        </li>
      `;

      html = rowHtml + html;
    }
    $('#detail-history').html(html);
  };

  const getDifferences = (current, previous) => {
    let result = [];

    if (previous !== null) {
      if (current.title !== previous.title) {
        result.push({
          field: 'T&iacutetol',
          difference: current.title
        })
      }
      const keywordsDifferences = getArrayDifferences(current.objectives, previous.objectives);
      if (keywordsDifferences) {
        result.push({
          field: 'Paraules clau',
          difference: keywordsDifferences
        })
      }
      const objectivesDifferences = getArrayDifferences(current.objectives, previous.objectives);
      if (objectivesDifferences) {
        result.push({
          field: 'keywords',
          difference: objectivesDifferences
        })
      }
      if (current.state !== previous.state) {
        result.push({
          field: 'Estat',
          difference: current.state
        })
      }
    }

    return result;
  };

  const getArrayDifferences = (current, previous) => {
    let result = current
                  .filter(x => !previous.includes(x))
                  .concat(previous.filter(x => !current.includes(x)))
    return result;
  };
})();