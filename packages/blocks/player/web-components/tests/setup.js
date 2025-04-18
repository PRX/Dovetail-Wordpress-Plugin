global.Audio = jest.fn().mockImplementation(() => ({
  addEventListener: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(() => Promise.resolve()),
  paused: true,
  muted: false,
  volume: 0.8,
}));

global.console = {
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
