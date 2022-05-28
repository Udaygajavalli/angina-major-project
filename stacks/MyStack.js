import * as sst from "@serverless-stack/resources";
import { StaticSite } from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    const frontend = new StaticSite(this, "apidocs", {
      path: "./frontend",
      s3Bucket: {
        publicReadAccess: true,
      },
    });

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        srcPath: "src",
      },
      routes: {
        "POST /": "lambda.handler",
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      frontend: frontend.url,
    });
  }
}
