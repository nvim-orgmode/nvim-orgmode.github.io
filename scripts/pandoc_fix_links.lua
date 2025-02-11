function Link(el)
  local target = el.target
  if target:sub(1, 2) == './' then
    target = target:gsub('^(%./%w+)(%.org)(.*)$', '%1.md%3')
    target = target:gsub('::', '')
  end
  el.target = target

  local content = {}
  local has_markup = false
  for _, item in ipairs(el.content) do
    if item.text then
      table.insert(content, item.text)
    end
    if item.content then
      has_markup = true
      for _, subitem in ipairs(item.content) do
        table.insert(content, subitem.text)
      end
    end
  end
  if has_markup then
    el.content = table.concat(content, '_')
  end
  return el
end
