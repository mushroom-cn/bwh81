/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @returns {string}
 */
function getApiCallDeclaresFromPage() {
  const apiDeclares = Array.from(document.querySelectorAll('table tr'))
    .map(resolveDeclareFromHtml)
    .flat(1)
    .filter(Boolean);
  return apiDeclares
    .map(({ funcName, parameters, description }) => {
      return generateFromTemplate(funcName, description, parameters);
    })
    .join('');
}
/**
 *
 * @param {HTMLTableRowElement} tr
 * @returns
 */
function resolveDeclareFromHtml(tr) {
  const tds = tr.querySelectorAll('td');
  if (!tds.length) {
    return null;
  }
  const [name, parameters, description] = tds;
  const params = parameters.textContent;
  return {
    funcName: name.textContent,
    description: description.textContent,
    parameters: resolveParameterDeclares(params),
  };
}

function resolveParameterDeclares(parameters) {
  if ('none' === parameters) {
    return [];
  }
  return parameters.split(',').map(resolveOptionalParameters).filter(Boolean);
}

function resolveOptionalParameters(v) {
  if (v.indexOf('(optional)') > -1) {
    return `${v.replace(/\(optional\)/gi, '')}?:string`;
  }
  return 'none' === v || !v ? '' : `${v}:string`;
}
/**
 *
 * @param {string} funcName
 * @param {string} description
 * @param {Array<string>} params
 * @returns {string}
 */
function generateFromTemplate(funcName, description, params) {
  return `
  /**
   * @description ${description}
   */
    ${convertFuncName2UpperCase(funcName, (p, index) => index === 0)}(${
      !params.length ? '' : `{data}:{data:{${params.join(',')}} }`
    }) {
        return this._httpClient<void, Types.${convertFuncName2UpperCase(
          funcName,
          () => false,
        )}Return>({method: "get", url: "/${funcName}", data: {
            ...(${params.length ? 'data' : '{}'}),
        }})
    }
  `;
}

/**
 *
 * @param {string} funcName
 * @returns {string}
 */
function convertFuncName2UpperCase(funcName, needToUpperCase) {
  return funcName
    .split('/')
    .map((fName, index) => {
      if (needToUpperCase(fName, index)) {
        return fName;
      }
      const firstChar = fName[0];
      return `${firstChar.toUpperCase()}${fName.slice(1)}`;
    })
    .join('');
}
