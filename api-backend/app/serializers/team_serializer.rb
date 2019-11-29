class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :escudo, :sigla, :divisao
end
