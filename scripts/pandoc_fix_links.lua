function Link(el)
  local target = el.target
  if target:sub(1, 2) == './' then
    target = target:gsub('^(%./%w+)(%.org)(.*)$', '%1.md%3')
    target = target:gsub('::', '')
  end
  el.target = target
  return el
end
