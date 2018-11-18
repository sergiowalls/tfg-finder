(() => {

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.chips');
        M.Chips.init(elems, {
            onChipSelect: (e, chip) => {console.log(chip.childNodes[0].textContent)},
            onChipAdd: (e, chip) => {
                let chips = M.Chips.getInstance($('.chips')).chipsData.map((x) => x.tag);
                console.log(chips);
                $.ajax({
                    url: "http://localhost:3003/users/" + localStorage.getItem('user') + "/keywords",
                    type: 'PUT',
                    data: JSON.stringify(chips),
                    contentType: 'application/json',
                    success: function(result) {
                        // Do something with the result
                    }});
            },
            onChipDelete: (e, chip) => {
                let chips = M.Chips.getInstance($('.chips')).chipsData.map((x) => x.tag);
                console.log(chips);
            }
        });
    });

    $('.chips').chips();

    $('.chips-placeholder').chips({
        placeholder: 'Paraules',
        secondaryPlaceholder: '+Paraula',
    });
})();