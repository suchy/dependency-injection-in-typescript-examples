import { getContainer } from "./container";

const container = getContainer();

const server = container.resolve("server");

server();
