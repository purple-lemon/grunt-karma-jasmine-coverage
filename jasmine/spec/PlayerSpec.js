describe("Player", function () {
  var player;
  var song;

  beforeEach(function () {
    player = new Player();
    song = new Song();

    var domElem = document.getElementById("existing-div");
    if (domElem === undefined || domElem === null) {
      var body = document.getElementsByTagName('body')[0];
      var extElem = document.createElement("div");
      extElem.setAttribute("id", "existing-div");
      body.appendChild(extElem);
    }
  });

  it("should be able to play a Song", function () {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);
    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  it("operations with dom success", function () {
    var domElem = document.getElementById("existing-div");
    domElem.innerHTML = "<span id='check'>Hi There</span>";
    var checkElem = document.getElementById("check");
    expect(checkElem).toBeDefined();
    expect(checkElem).not.toBe(null);
  })

  it("operations with dom to fail", function () {
    var domElem = document.getElementById("existing-div");
    domElem.innerHTML = "<span id='check'>Hi There</span>";
    var checkElem = document.getElementById("checks");
    expect(checkElem).toBeDefined();
    expect(checkElem).toBe(null);
  })

  describe("when song has been paused", function () {
    beforeEach(function () {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function () {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function () {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function () {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function () {
    it("should throw an exception if song is already playing", function () {
      player.play(song);

      expect(function () {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
