with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_logic = """  const toggleDevService = (type: keyof typeof devServices) => {
    setDevServices(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        selected: !prev[type].selected
      }
    }));
  };"""

new_logic = """  const toggleDevService = (type: keyof typeof devServices) => {
    setDevServices(prev => {
      const next = { ...prev };
      const isSelecting = !prev[type].selected;
      
      if (isSelecting) {
        if (type === 'web-company' || type === 'web-custom') {
          next['web-landing'] = { ...next['web-landing'], selected: false };
          next['web-ecommerce'] = { ...next['web-ecommerce'], selected: false };
          if (type === 'web-company') next['web-custom'] = { ...next['web-custom'], selected: false };
          if (type === 'web-custom') next['web-company'] = { ...next['web-company'], selected: false };
        } else if (type === 'web-landing' || type === 'web-ecommerce') {
          next['web-company'] = { ...next['web-company'], selected: false };
          next['web-custom'] = { ...next['web-custom'], selected: false };
        }
      }

      next[type] = {
        ...next[type],
        selected: isSelecting
      };
      
      return next;
    });
  };"""

content = content.replace(old_logic, new_logic)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
