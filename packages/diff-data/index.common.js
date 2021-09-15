const ARRAYTYPE = '[object Array]'
const OBJECTTYPE = '[object Object]'
const FUNCTIONTYPE = '[object Function]'

function diffData(current, previous) {
  const result = {}
  syncKeys(current, previous)
  _diff(current, previous, '', result)
  return result
}

function syncKeys(current, previous) {
  if (current === previous) return
  const rootCurrentType = type(current)
  const rootPreType = type(previous)
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in previous) {
      const currentValue = current[key]
      if (currentValue === undefined) {
        current[key] = null
      } else {
        syncKeys(currentValue, previous[key])
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= previous.length) {
      previous.forEach((item, index) => {
        syncKeys(current[index], item)
      })
    }
  }
}

function _diff(current, previous, path, result) {
  if (current === previous) return
  const rootCurrentType = type(current)
  const rootPreType = type(previous)
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(previous).length) {
      setResult(result, path, current)
    } else {
      for (let key in current) {
        const currentValue = current[key]
        const preValue = previous[key]
        const currentType = type(currentValue)
        const preType = type(preValue)
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != previous[key]) {
            setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
            } else {
              currentValue.forEach((item, index) => {
                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result)
              })
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == '' ? '' : path + ".") + key, currentValue)
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result)
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current)
    } else {
      if (current.length < previous.length) {
        setResult(result, path, current)
      } else {
        current.forEach((item, index) => {
          _diff(item, previous[index], path + '[' + index + ']', result)
        })
      }
    }
  } else {
    setResult(result, path, current)
  }
}

function setResult(result, k, v) {
  if (type(v) != FUNCTIONTYPE) {
    result[k] = v
  }
}

function type(obj) {
  return Object.prototype.toString.call(obj)
}

module.exports = {
  diffData
}