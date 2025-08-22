interface HelixDBClient {
  url: string;
  /**
   * Query the HelixDB API
   * @param endpoint - The endpoint to query
   * @param data - The data to send to the endpoint
   * @returns The response from the endpoint
   */
  query: (endpoint: string, data: HelixDBInput) => Promise<HelixDBResponse>;
}

export type HelixDBResponse = Record<string, any>;
export type HelixDBInput = Record<string, any>;

class HelixDB implements HelixDBClient {
  url: string;

  /**
   * Create a new HelixDB client
   * @param url - The url of the HelixDB server
   *
   * (default: `https://localhost:6970`)
   */
  constructor(url: string = 'http://localhost:6970') {
    this.url = url;
  }

  async query(endpoint: string, data: HelixDBInput): Promise<HelixDBResponse> {
    const response = await fetch(`${this.url}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

const test = async () => {
  const helixDB = new HelixDB(
    // Comment to use local helixDB
    'https://ziqtrweyri.execute-api.us-west-1.amazonaws.com/v1'
  );
  const response = await helixDB.query('addUser', {});
  console.log(response);
};

test();
