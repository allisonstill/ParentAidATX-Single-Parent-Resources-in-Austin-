import "@testing-library/jest-dom"; // This imports the matchers
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
