describe("Character walk", function() {
    beforeEach(function() {
            // Load fixtures
            $.ajax({
              async: false,
              dataType: 'html',
              url: '../fixtures/character.html',
              success: function(data) {
                $('body').append($(data));
                $('body').css({"width": "1000px",
                               "height": "3000px"});
                CHARACTER.initialize();
              }
            });
    });
    
    it("Moves 1 px up", function() {
        var press = jQuery.Event('keypress');
        
        spyOn(CHARACTER, "_walk");
        
        CHARACTER.walk("up");
        
        expect(CHARACTER._walk).toHaveBeenCalledWith("up");
    });
});