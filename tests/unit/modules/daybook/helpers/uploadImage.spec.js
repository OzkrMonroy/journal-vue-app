import axios from "axios";
import "setimmediate";
import cloudinary from "cloudinary";
import uploadImage from "@/modules/daybook/helpers/uploadImage";

jest.setTimeout(20000);
cloudinary.config({
  cloud_name: process.env.VUE_APP_CLOUD_NAME,
  api_key: process.env.VUE_APP_API_KEY,
  api_secret: process.env.VUE_APP_API_SECRET,
});

describe("Tests for uploadImage", () => {
  test("should upload an image and returns the url", async () => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/dxae8onmb/image/upload/v1650578350/ruo6qugvgc21yqoj6tfj.jpg",
      { responseType: "arraybuffer" }
    );

    const file = new File([data], "photo.jpg");
    const url = await uploadImage(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    const { deleted } = await cloudinary.v2.api.delete_resources(imageId);

    expect(deleted).toEqual({ [imageId]: "deleted" });
  });
});
