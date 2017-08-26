json.id @atom.id
json.title @atom.title
json.influence @atom.influence.to_s
json.slug @atom.slug
json.description @atom.description

json.parents @atom.child_connections, :id, :parent
json.children @atom.parent_connections, :id, :child
json.siblings @atom.siblings
