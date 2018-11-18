(() => {

    const proposalId = parseInt(window.location.pathname.split("/")[2]);

    const dataAccess = TFGFinder.Util.getDataAccess('Api');
    dataAccess.getProposalById(proposalId)
        .then(proposal => {
            setTimeout(() => {
                if (window.formLoaded) {
                    let itemsId = 0;
                    $('#title').val(proposal.title).focus();
                    $('#description').val(proposal.description).focus();

                    let itemId = itemsId++;
                    proposal.goals.forEach(goal => {
                        let newItem = '<li id="' + itemId + '" class="collection-item"><div>' + goal +
                            '<a href="#" class="secondary-content"><i class="material-icons waves-effect" onclick="removeGoal(' +
                            itemId + ')">delete</i></a></div></li>';
                        $('#goals').append(newItem);
                        itemId++;
                    });

                    let keywords = proposal.keywords.map((x) => {
                        return {tag: x}
                    });
                    var elems = document.querySelectorAll('.chips');
                    allChips = M.Chips.init(elems, {
                        data: keywords
                    });

                }
            }, 100)

        });

})();