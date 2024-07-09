// TODO 请求函数，一般项目中为axios实例， 格式为第一参数为URL，第二参数为请求参数, 为了简化，直接使用默认的fetch， 可以根据自己项目实际情况改写

const BASE_URL = 'https://petstore.swagger.io/v2'

interface FetchOptions extends RequestInit {
    timeout?: number;
}

interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
}

class ApiError extends Error {
    status: number;
    statusText: string;

    constructor(message: string, status: number, statusText: string) {
        super(message);
        this.status = status;
        this.statusText = statusText;
    }
}

async function fetchWithTimeout(url: string, options: FetchOptions = {}): Promise<Response> {
    const { timeout = 5000, ...fetchOptions } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

async function request<T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    try {
        const response = await fetchWithTimeout(`${BASE_URL}${url}`, options);

        if (!response.ok) {
            throw new ApiError(
                `HTTP error! status: ${response.status}`,
                response.status,
                response.statusText
            );
        }

        const data = await response.json();

        return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        if (error instanceof Error) {
            throw new ApiError(error.message, 0, 'Unknown Error');
        }
        throw new ApiError('Unknown Error', 0, 'Unknown Error');
    }
}

export default request;