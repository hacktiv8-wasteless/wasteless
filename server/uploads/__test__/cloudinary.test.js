const request = require("supertest");
const app = require("../app");
const CloudinaryCloud = require("../helpers/uploader");

jest.setTimeout(1000);

const cloudinary = require("cloudinary");
jest.mock("cloudinary");

beforeEach(() => {
  cloudinary.v2.uploader.upload.mockResolvedValue({
    url: "img.png",
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
