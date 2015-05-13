$(document).ready(function(){
  songs = []
  playlistlength = $('.playlist').children().length
    for(var i=0; i<playlistlength;i++){
      songs.push({
      "title":($('.' + i).find('.songlist').text()),
      "song_url":($('.' + i).find('.songurl').text()),
      "soundcloud_id":($('.' + i).find('.trackid').text())
      })
    }

  Track = function (trackId){
    var currentTrack = "";
    SC.initialize({
        client_id: 'db17be73cc8a86e63b53a69839d67352'
    });

    SC.stream("http://api.soundcloud.com/tracks/" + trackId, {onfinish: function(){
      currentPlayingTrack.stop();
      currentTrack = rotation.nextTrack();
      currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      currentPlayingTrack.play();
      $('.trackTitle').html(currentTrack.title);
      }
    }, function(sound){currentTrack = sound});

    this.pause = function() {
      currentTrack.pause();
    };

    this.stop = function() {
      currentTrack.stop();
    };

    this.play = function() {
      currentTrack.play({
        onfinish: function(){
          $('.trackTitle').html(currentTrack.title);
          currentTrack = rotation.nextTrack()
          currentPlayingTrack = new Track(currentTrack.soundcloud_id)
          currentPlayingTrack.play()
          $('.trackTitle').html(currentTrack.title)
        },
        onload: function() {
          if (this.readyState == 2) {
            rotation.nextTrack()
            currentTrack = rotation.nextTrack()
            currentPlayingTrack = new Track(currentTrack.soundcloud_id)
            currentPlayingTrack.play()
            $('.trackTitle').html(currentTrack.title)
          }
        }
      });
    };

  } //Track end

  Rotation = function(tracks) {
        var currentTrack = tracks[0];
        this.currentTrack = function () {
          return currentTrack;
        };

        this.nextTrack = function () {
          var currentIndex = tracks.indexOf(currentTrack);

          var nextTrackIndex = currentIndex + 1;
          if (nextTrackIndex === $('.playlist').children().length){
            playlistlength = $('.playlist').children().length
              for(var i=0; i<playlistlength;i++){
                songs.push({
                "title":($('.' + i).find('.songlist').text()),
                "song_url":($('.' + i).find('.songurl').text()),
                "soundcloud_id":($('.' + i).find('.trackid').text())
                })
              }
            // rotation = new Rotation(songs)
            currentTrack = rotation.currentTrack();
            currentPlayingTrack = new Track(currentTrack.soundcloud_id);
            currentPlayingTrack.play();
            $('.trackTitle').html(rotation.currentTrack().title);
            $('#pause').show();
            $('#play').hide();
          }
          console.log(nextTrackIndex)
          var nextTrackId = tracks[nextTrackIndex];
          currentTrack = nextTrackId;
          return currentTrack
        };
  }; //Rotation end

  rotation = new Rotation(songs);
  currentTrack = rotation.currentTrack();
  currentPlayingTrack = new Track(currentTrack.soundcloud_id);

  $('#play').on('click', function(event){
      currentPlayingTrack.play();
      $('.trackTitle').html(rotation.currentTrack().title);
      $('#pause').show();
      $('#play').hide();
  });

  $('#pause').on('click', function(event){
      currentPlayingTrack.pause();
      //OLD $('.trackTitle').html(currentTrack.title);
      $('.trackTitle').html(rotation.currentTrack().title);
      $('#pause').hide();
      $('#play').show();
  });

  $('#stop').on('click', function(event){
      currentPlayingTrack.stop();
      $('.trackTitle').html(rotation.currentTrack().title);
      $('#pause').hide();
      $('#play').show();
      //OLD$('.trackTitle').html(currentTrack.title);
  });

  $('#next').on('click', function(event){
      currentPlayingTrack.stop();
      //OLD$('.trackTitle').html(currentTrack.title);
      currentTrack = rotation.nextTrack();
      currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      currentPlayingTrack.play();
      $('.trackTitle').html(rotation.currentTrack().title);
  });

})