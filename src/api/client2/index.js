import { stringify } from "query-string";
import { service } from "..";
import {
  fetchUtils,
  HttpError,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from "react-admin";

/**
 * Maps react-admin queries to 4Events REST API
 */
const httpAuthClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  /* set */
  options.headers.set("Content-Type", "application/x-www-form-urlencoded");

  /** Authorization */
  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("x-access-token", token);
  }

  /* done */
  return fetchUtils.fetchJson(url, options);
};
export default (apiUrl, httpClient = httpAuthClient) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    let profile = "User";
    if (resource === "organizers") {
      profile = "Organizer";
      resource = "users";
    }
    if (resource === "admins") {
      profile = "Admin";
      resource = "users";
    }
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        /* check */
        if (resource === "users") {
          /* set */
          const orderSign = order === "DESC" ? "-" : "";
          let sortQuery = {};
          if (field) sortQuery["sort"] = orderSign + field;

          /* set */
          let filterQuery = {};
          if (params.filter.q) filterQuery["queryText"] = params.filter.q;
          if (params.filter.create_date)
            filterQuery["create_date"] = params.filter.create_date;
          filterQuery["profile"] = profile;
          if (params.filter.city) filterQuery["city"] = params.filter.city;

          /* set */
          const query = {
            skip: (page - 1) * perPage,
            limit: perPage,
            includeTotal: "true",
            fields:
              "create_date profile email first_name last_name alias address zip_code province country idn company_name mobile_number phone_number favorite_searches transactions city events",
            ...sortQuery,
            ...filterQuery
          };
          console.log(
            "<APIClient> convertDataRequestToHTTP: GET_LIST - params.filter=%o, query=%o",
            params.filter,
            query
          );
          url += `${apiUrl}/${resource}/list?${stringify(query)}`;
        } else if (resource === "cities") {
          const orderSign = order === "DESC" ? "-" : "";
          let sortQuery = {};
          if (field && field !== "id") sortQuery["sort"] = orderSign + field;
          else sortQuery["sort"] = "city";

          /* set */
          let filterQuery = {};
          if (params.filter.q) filterQuery["city"] = params.filter.q;
          filterQuery["country"] = "España";

          /* set */
          const query = {
            limit: 250,
            ...filterQuery,
            ...sortQuery
          };
          console.log(
            "<APIClient> convertDataRequestToHTTP: GET_LIST - params.filter=%o, query=%o",
            params.filter,
            query
          );
          url += `${apiUrl}/${resource}?${stringify(query)}`;
        } else if (resource === "provinces" || resource === "countries") {
          const orderSign = order === "DESC" ? "-" : "";
          let sortQuery = {};
          if (field) sortQuery["sort"] = orderSign + field;

          /* set */
          const query = {
            skip: (page - 1) * perPage,
            limit: perPage,
            includeTotal: "true",
            ...sortQuery
          };
          console.log(
            "<APIClient> convertDataRequestToHTTP: GET_LIST - params.filter=%o, query=%o",
            params.filter,
            query
          );
          url += `${apiUrl}/${resource}/list?${stringify(query)}`;
        } else if (resource === "eventtypes") {
          const orderSign = order === "DESC" ? "-" : "";
          let sortQuery = {};
          if (field) sortQuery["sort"] = orderSign + field;

          /* set */
          const query = {
            skip: (page - 1) * perPage,
            limit: perPage,
            includeTotal: "true",
            ...sortQuery
          };
          console.log(
            "<APIClient> convertDataRequestToHTTP: GET_LIST - params.filter=%o, query=%o",
            params.filter,
            query
          );
          url += `${apiUrl}/${resource}?${stringify(query)}`;
        } else if (resource === "events") {
          /* set */
          const orderSign = order === "DESC" ? "-" : "";
          let sortQuery = {};
          if (field) sortQuery["sort"] = orderSign + field;

          /* set */
          let filterQuery = {};
          if (params.filter.q) filterQuery["queryText"] = params.filter.q;
          if (localStorage.getItem("role") === "Organizer")
            filterQuery["organizerId"] = localStorage.getItem("id");

          /* set */
          const query = {
            skip: (page - 1) * perPage,
            limit: perPage,
            includeTotal: "true",
            ...sortQuery,
            ...filterQuery
          };
          console.log(
            "<APIClient> convertDataRequestToHTTP: GET_LIST - params.filter=%o, query=%o",
            params.filter,
            query
          );
          url += `${apiUrl}/${resource}?${stringify(query)}`;
        } else {
          /* set */
          let filterQuery = {};
          if (params.filter.name) filterQuery["name"] = params.filter.name;

          /* set */
          const query = {
            ...filterQuery
          };
          console.log(
            "<APIClient> convertDataRequestToHTTP: GET_LIST - params.filter=%o, query=%o",
            params.filter,
            query
          );
          url += `${apiUrl}/${resource}?${stringify(query)}`;
        }

        break;
      }
      case GET_ONE:
        if (resource === "events")
          url += `${apiUrl}/${resource}?id=${
            params.id
          }&media=name+description+url+_id+poster`;
        else if (resource === "eventtypes" || resource === "cities")
          url += `${apiUrl}/${resource}?id=${params.id}`;
        else url += `${apiUrl}/${resource}/${params.id}`;
        break;
      case UPDATE:
        options.method = "PUT";
        if (resource === "eventtypes") {
          url += `${apiUrl}/${resource}/${params.id}?${stringify({
            name: params.data.name
          })}`;
        } else {
          url += `${apiUrl}/${resource}/${params.id}`;

          /* sanitize */
          delete params.data.__v;
          delete params.data._id;
          delete params.data.id;
          delete params.data.create_date;
          delete params.data.delete_date;
          if (resource === "users") {
            delete params.data.password;
          } else if (resource === "events") {
            delete params.data.organizer;
          }

          /* set */
          options.body = stringify(params.data);
        }
        break;
      case CREATE:
        console.log(
          "<APIClient> convertDataRequestToHTTP: CREATE - resource=%o, params.data=%o",
          resource,
          params.data
        );
        if (resource === "users") url += `${apiUrl}/${resource}/register`;
        else if (resource === "eventtypes")
          url += `${apiUrl}/${resource}?${stringify(params.data)}`;
        else if (resource === "events") {
          // Server Patch (Allows Longer Descriptions for Events)
          options.body = stringify(params.data);

          /* set */
          delete params.data.description;
          url += `${apiUrl}/${resource}?${stringify(params.data)}`;
        } else url += `${apiUrl}/${resource}`;
        options.method = "POST";
        if (resource !== "eventtypes" && resource !== "events") {
          if (resource === "users") params.data.profile = profile;
          options.body = stringify(params.data);
        }
        break;
      case DELETE:
        if (resource === "events")
          url += `${apiUrl}/${resource}/${params.id}?${stringify({
            organizer: localStorage.getItem("id"),
            profile: localStorage.getItem("role")
          })}`;
        else
          url += `${apiUrl}/${resource}/${params.id}?${stringify({
            admin: localStorage.getItem("id")
          })}`;
        options.method = "DELETE";
        console.log(
          "<APIClient> convertDataRequestToHTTP: DELETE - url=%o, options=%o",
          url,
          options
        );
        break;
      default:
        throw new Error(`Unsupported fetch  action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    if (resource === "organizers") {
      resource = "users";
    }
    if (resource === "admins") {
      resource = "users";
    }
    const { json } = response;
    console.log(
      "<APIClient> convertHTTPResponse: Entering, response=%o, type=%o. resource=%o, params=%o",
      response,
      type,
      resource,
      params
    );
    switch (type) {
      case DELETE:
        console.log(
          "<APIClient> convertHTTPResponse: DELETE - params.previousData=%o",
          params.previousData
        );
        if (response.json.ok)
          return {
            data: params.previousData
          };
        break;
      case GET_LIST:
        let rows = json.result;
        if (resource === "users") rows = json.result.rows;
        else if (resource === "cities") rows = json.result;
        else if (resource === "provinces") rows = json.result.rows;
        else if (resource === "countries") rows = json.result.rows;
        console.log("<APIClient> convertHTTPResponse: GET_LIST, rows=%o", rows);
        rows = rows.map(item => {
          let res = { id: item._id, ...item };
          if (
            resource === "events" &&
            item.location &&
            item.location.coordinates
          ) {
            res.location =
              item.location.coordinates[1] + "," + item.location.coordinates[0];
          }
          return res;
        });
        let total = rows.length;
        if (json.result.total) total = json.result.total;

        return {
          data: rows,
          total: total
        };
      case CREATE:
        if (resource === "users")
          return { data: { ...json.user, id: json.user._id } };
        else {
          let res = { data: { ...json.data, id: json.data._id } };
          if (resource === "events") {
            /* create */
            service
              .createPoster(res.data.id, `${res.data.name}`, params.data.poster)
              .then(response => {
                console.log(
                  "<APIClient> convertHTTPResponse: POSTER Response response=%o",
                  response
                );
              })
              .catch(function({ config, request, response }) {
                console.log(
                  "<APIClient> convertHTTPResponse: POSTER Exception caught, args=%o, config=%o, request=%o, response=%o",
                  arguments,
                  config,
                  request,
                  response
                );
              });

            /* set */
            res.data.poster = { src: params.data.poster };

            /* check */
            if (
              resource === "events" &&
              json.data.location &&
              json.data.location.coordinates
            ) {
              res.data.location =
                json.data.location.coordinates[1] +
                "," +
                json.data.location.coordinates[0];
            }

            /* done */
            console.log(
              "<APIClient> convertHTTPResponse: CREATE EVENT, Got res=%o",
              res
            );
          }
          return res;
        }
      case GET_ONE:
        if (resource === "users")
          return { data: { ...json.user, id: json.user._id } };
        else if (resource === "events") {
          const event = json.result[0];
          let res = { data: { id: event._id, ...event } };
          if (event.location && event.location.coordinates) {
            res.data.location =
              event.location.coordinates[1] +
              "," +
              event.location.coordinates[0];
          }
          console.log(
            "<APIClient> convertHTTPResponse: GET_ONE EVENT, Got event.media=%o",
            event.media
          );
          if (event.media) {
            const poster = event.media.find(e => e.poster || !e.poster);
            //const poster = event.media.find(e => e.poster);
            if (poster) {
              res.data.poster = { src: poster.url };
              res.data.posterId = poster._id;
            }
          }
          console.log(
            "<APIClient> convertHTTPResponse: GET_ONE EVENT, Got res=%o",
            res
          );
          return res;
        } else return { data: { ...json.result, id: json.result._id } };
      case UPDATE:
        if (resource === "users")
          return { data: { ...json.user, id: json.user._id } };
        else if (resource === "events") {
          let res = { data: { ...json.result, id: json.result._id } };

          /* set */
          res.data.poster = { src: params.data.poster };

          /* create */
          console.log(
            "<APIClient> convertHTTPResponse: About to update Poster, posterId=%o, poster=%o",
            params.data.posterId,
            params.data.poster
          );
          service
            .updatePoster(
              params.data.posterId,
              `${res.data.name}`,
              params.data.poster
            )
            .then(response => {
              console.log(
                "<APIClient> convertHTTPResponse: POSTER Response response=%o",
                response
              );
            })
            .catch(function({ config, request, response }) {
              console.log(
                "<APIClient> convertHTTPResponse: POSTER Exception caught, args=%o, config=%o, request=%o, response=%o",
                arguments,
                config,
                request,
                response
              );
            });

          /* check */
          if (json.result.location && json.result.location.coordinates) {
            res.data.location =
              json.result.location.coordinates[1] +
              "," +
              json.result.location.coordinates[0];
          }
          console.log(
            "<APIClient> convertHTTPResponse: UPDATE EVENT, Got res=%o",
            res
          );
          return res;
        } else if (resource === "eventtypes")
          return { data: { ...json.result, id: json.result._id } };
        else return { data: json };
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    console.log(
      "<APIClient> main: type=%o. resource=%o, params=%o",
      type,
      resource,
      params
    );
    // simple-rest doesn't handle GET_MANY route, so we fallback to calling GET n times instead
    if (type === GET_MANY) {
      if (resource === "organizers") {
        resource = "users";
      }
      if (resource === "admins") {
        resource = "users";
      }
      return Promise.all(
        params.ids.map(id => {
          if (id._id) id = id._id; // Patch: 'cities'
          let url = `${apiUrl}/${resource}/${id}`;
          if (resource === "eventtypes" || resource === "cities")
            url = `${apiUrl}/${resource}?id=${id}`;
          return httpClient(url, {
            method: "GET"
          });
        })
      ).then(responses => {
        console.log(
          "<APIClient> main: GET_MANY - Got, responses=%o",
          responses
        );
        return {
          data: responses.map(response => {
            if (resource === "users")
              return { ...response.json.user, id: response.json.user._id };
            else if (resource === "cities") {
              if (!response.json.ok) return { id: null };
              return {
                ...response.json.result[0],
                id: response.json.result[0]._id
              };
            } else if (resource === "provinces")
              return {
                ...response.json.province,
                id: response.json.province._id
              };
            else if (resource === "countries")
              return {
                ...response.json.country,
                id: response.json.country._id
              };
            else
              return { ...response.json.result, id: response.json.result._id };
          })
        };
      });
    }
    // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      if (resource === "organizers") {
        resource = "users";
      }
      if (resource === "admins") {
        resource = "users";
      }
      return Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "PUT",
            body: stringify(params.data)
          })
        )
      ).then(responses => ({
        data: responses.map(response => response.json)
      }));
    }
    // simple-rest doesn't handle  filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      if (resource === "organizers") {
        resource = "users";
      }
      if (resource === "admins") {
        resource = "users";
      }
      return Promise.all(
        params.ids.map(id => {
          let url = `${apiUrl}/${resource}/${id}?${stringify({
            admin: localStorage.getItem("id")
          })}`;
          if (resource === "events")
            url = `${apiUrl}/${resource}/${id}?${stringify({
              organizer: localStorage.getItem("id"),
              profile: localStorage.getItem("role")
            })}`;
          return httpClient(url, {
            method: "DELETE"
          });
        })
      ).then(responses => ({
        data: responses.map(response => response.json)
      }));
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    return httpClient(url, options)
      .then(response => {
        return convertHTTPResponse(response, type, resource, params);
      })
      .catch(function(error) {
        console.log(
          "<APIClient> Exception caught, args=%o, status=%o",
          arguments,
          error.status
        );
        if (error.status < 200 || error.status >= 300) {
          let message =
            (error.body && error.body.error && error.body.error.message) ||
            (error.body && error.body.result && error.body.result.message) ||
            (error.body && error.body.message) ||
            error.message;
          let errors = error.body.errors;
          if (!errors) errors = error.body.result;

          if (errors && errors.length > 0) {
            message = "invalid_format_" + errors[0].field;
          }
          console.log(
            "<APIClient> Got, errors=%o, message=%o",
            errors,
            message
          );
          return Promise.reject(new HttpError(message, error.status));
        }
      });
  };
};
