const res = eval(`
  ${process.env.RAW_CODE}

  ${process.env.MAIN_FUNCTION_NAME}()
`)
