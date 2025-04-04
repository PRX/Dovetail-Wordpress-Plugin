global.Audio = jest.fn().mockImplementation(() => ({
  addEventListener: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(() => Promise.resolve()),
}));

global.console = {
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
