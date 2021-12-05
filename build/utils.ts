const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {};
  for (const envName of Object.keys(envConf)) {
    let val = envConf[envName];
    val = val === "true" ? true : val === "false" ? false : val;

    if (envName === "VITE_PORT") {
      val = Number(val);
    }
    ret[envName] = val;
  }
  return ret;
};

export { wrapperEnv };
