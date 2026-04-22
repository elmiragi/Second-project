/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum TestType {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

/** @format int32 */
export enum AnswerType {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

export interface AuthRequest {
  /** @minLength 1 */
  login: string;
  /** @minLength 1 */
  password: string;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

/** Модель начала попытки */
export interface CreateAttemptRequest {
  /**
   * Идентификатор теста
   * @format int32
   */
  testId?: number;
}

export interface UpdateAttemptRequest {
  /**
   * Идентфикатор попытки
   * @format int32
   */
  id?: number;
}

export interface AttemptReviewDto {
  /** @format int32 */
  attemptId?: number;
  /** @format int32 */
  testId?: number;
  /** @format int32 */
  score?: number;
  /** @format int32 */
  maxScore?: number;
  canShowReview?: boolean;
  items?: AttemptReviewItemDto[] | null;
}

export interface AttemptReviewItemDto {
  /** @format int32 */
  questionId?: number;
  /** @format int32 */
  answerType?: number;
  /** @format int32 */
  maxScore?: number;
  /** @format int32 */
  earned?: number;
  correctAnswerIds?: number[] | null;
  selectedAnswerIds?: number[] | null;
}

export interface CreateStudentAnswerRequest {
  /**
   * К какой попытке привязан выбор
   * @format int32
   */
  attemptId?: number;
  /**
   * На какой вопрос дан ответ
   * @format int32
   */
  questionId?: number;
  /** Какие были выбраны варианты ответов (или один в случае с единичным выбором) */
  userSelectedOptions?: number[] | null;
  /** Если вопрос был текстовый, то здесь храним текстовый ответ */
  userTextAnswers?: string | null;
}

export interface AnswerResponseForStudent {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Текст ответа */
  text?: string | null;
}

/** Вопрос */
export interface QuestionResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Тест вопроса */
  text?: string | null;
  /**
   * Номер вопроса в тесте
   * @format int32
   */
  number?: number;
  /** Описание вопроса */
  description?: string | null;
  answerType?: AnswerType;
  /** Оценивается ли тест */
  isScoring?: boolean;
  /**
   * Сколько баллов можно получить за вопрос
   * @format int32
   */
  maxScore?: number;
  /** Список ответов */
  answers?: AnswerResponseForStudent[] | null;
}

export interface StudentTestSummaryDto {
  /** @format int32 */
  testId?: number;
  /** @format int32 */
  maxAttempts?: number | null;
  /** @format int32 */
  attemptsUsed?: number;
  /** @format int32 */
  attemptsLeft?: number | null;
  hasActiveAttempt?: boolean;
  /** @format int32 */
  activeAttemptId?: number | null;
  hasGradedAttempt?: boolean;
  /** @format int32 */
  bestScore?: number | null;
}

/** Краткая модель теста */
export interface TestResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Название */
  title?: string | null;
  /** Описание */
  description?: string | null;
  /** Можно ли пройти тест больше одного раза */
  isRepeatable?: boolean;
  type?: TestType;
  /** Опубликован ли для студентов */
  isPublic?: boolean;
  /**
   * Дата создания
   * @format date-time
   */
  createdAt?: string;
}

export interface TestResultDto {
  /** @format int32 */
  id?: number;
  passed?: boolean;
  /** @format int32 */
  testId?: number;
  /** @format int32 */
  attemptId?: number;
  /** @format int32 */
  bestScore?: number;
  /** @format int32 */
  studentId?: number;
}

/** Детальный результат теста для студента */
export interface TestResultDetailResponse {
  /**
   * Идентификатор теста
   * @format int32
   */
  testId?: number;
  /** Есть ли хотя бы одна попытка */
  hasAnyAttempt?: boolean;
  /**
   * ID лучшей попытки
   * @format int32
   */
  bestAttemptId?: number | null;
  /**
   * Лучший балл
   * @format int32
   */
  bestScore?: number | null;
  /**
   * Максимальный балл за тест
   * @format int32
   */
  maxScore?: number;
  /** Пройден ли тест */
  passed?: boolean;
  /**
   * Использовано попыток
   * @format int32
   */
  attemptsUsed?: number;
  /**
   * Осталось попыток
   * @format int32
   */
  attemptsLeft?: number | null;
  /** Можно ли показывать разбор */
  canShowReview?: boolean;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Testing Platform API (Student)
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthCreate
     * @request POST:/api/Auth
     * @secure
     */
    authCreate: (data: AuthRequest, params: RequestParams = {}) =>
      this.request<any, ProblemDetails>({
        path: `/api/Auth`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthRefreshCreate
     * @request POST:/api/Auth/refresh
     * @secure
     */
    authRefreshCreate: (params: RequestParams = {}) =>
      this.request<any, ProblemDetails>({
        path: `/api/Auth/refresh`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLogoutCreate
     * @request POST:/api/Auth/logout
     * @secure
     */
    authLogoutCreate: (params: RequestParams = {}) =>
      this.request<any, ProblemDetails>({
        path: `/api/Auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tests
     * @name TestsAvailableList
     * @summary Получить список тестов (для студента)
     * @request GET:/api/Tests/available
     * @secure
     */
    testsAvailableList: (
      query?: {
        /** Фильтр по публичности теста */
        isPublic?: boolean;
        /** Поиск по названию теста */
        searchTitle?: string;
        /** Поле для сортировки ("Title" или "PublishedAt") */
        sortBy?: string;
        /**
         * Направление сортировки (true — по убыванию)
         * @default true
         */
        sortDescending?: boolean;
        /**
         * Номер страницы (начинается с 1)
         * @format int32
         * @default 1
         */
        pageNumber?: number;
        /**
         * Размер страницы
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TestResponse[], ProblemDetails>({
        path: `/api/Tests/available`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tests
     * @name TestsDetail
     * @summary Получить тест по id (для студента)
     * @request GET:/api/Tests/{id}
     * @secure
     */
    testsDetail: (id: number, params: RequestParams = {}) =>
      this.request<TestResponse, ProblemDetails>({
        path: `/api/Tests/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Question
     * @name QuestionList
     * @summary Получить список вопросов
     * @request GET:/api/Question
     * @secure
     */
    questionList: (
      query?: {
        /** @format int32 */
        testId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionResponse[], ProblemDetails>({
        path: `/api/Question`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Question
     * @name QuestionDetail
     * @summary Получить вопрос по идентификатору
     * @request GET:/api/Question/{id}
     * @secure
     */
    questionDetail: (id: number, params: RequestParams = {}) =>
      this.request<QuestionResponse, ProblemDetails>({
        path: `/api/Question/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attempts
     * @name AttemptsCreate
     * @summary Начать попытку
     * @request POST:/api/Attempts
     * @secure
     */
    attemptsCreate: (data: CreateAttemptRequest, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Attempts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attempts
     * @name AttemptsUpdate
     * @summary Закончить попытку
     * @request PUT:/api/Attempts
     * @secure
     */
    attemptsUpdate: (data: UpdateAttemptRequest, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Attempts`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attempts
     * @name AttemptsReviewList
     * @summary Получить разбор попытки
     * @request GET:/api/Attempts/{attemptId}/review
     * @secure
     */
    attemptsReviewList: (attemptId: number, params: RequestParams = {}) =>
      this.request<AttemptReviewDto, ProblemDetails>({
        path: `/api/Attempts/${attemptId}/review`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StudentAnswers
     * @name StudentAnswersCreate
     * @summary Дать ответ на вопрос
     * @request POST:/api/StudentAnswers
     * @secure
     */
    studentAnswersCreate: (
      data: CreateStudentAnswerRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/StudentAnswers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags StudentTests
     * @name StudentTestsSummaryList
     * @summary Получить сводку по попыткам всех доступных студенту тестов
     * @request GET:/api/StudentTests/summary
     * @secure
     */
    studentTestsSummaryList: (params: RequestParams = {}) =>
      this.request<StudentTestSummaryDto[], ProblemDetails>({
        path: `/api/StudentTests/summary`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description После добавления авторизации получение id через параметры будет удалено
     *
     * @tags TestResults
     * @name TestResultsStudentList
     * @summary Получить результаты студента
     * @request GET:/api/TestResults/student
     * @secure
     */
    testResultsStudentList: (params: RequestParams = {}) =>
      this.request<TestResultDto, ProblemDetails>({
        path: `/api/TestResults/student`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Позволяет получить детальную информацию о результатах прохождения конкретного теста
     *
     * @tags TestResults
     * @name TestResultsTestDetail
     * @summary Получить результат теста для текущего студента
     * @request GET:/api/TestResults/test/{testId}
     * @secure
     */
    testResultsTestDetail: (testId: number, params: RequestParams = {}) =>
      this.request<TestResultDetailResponse, ProblemDetails>({
        path: `/api/TestResults/test/${testId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
