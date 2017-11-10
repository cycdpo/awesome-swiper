import AwesomeSwiper from '../dist/AwesomeSwiper';

describe('ui spec', () => {
  const
    videoWrapper = document.createElement('div')
    , source = 'https://raw.githubusercontent.com/cycjimmy/staticFiles/storage/media/Sony_test_video_vertical_720x1280.mp4'
  ;

  videoWrapper.style.width = '360px';
  videoWrapper.style.height = '640px';

  let
    videoDefault = new H5VideoPlayer(source, {
      context: videoWrapper,
      control: true,
    }).load()
  ;

  test('videoDefault.container.parentNode should be videoWrapper', () => {
    expect(videoDefault.container.parentNode).toBe(videoWrapper);
  });
});
