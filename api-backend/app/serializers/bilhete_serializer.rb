class BilheteSerializer < ActiveModel::Serializer
  attributes :id, :rodada_id, :partida_id, :numero, :resultado, :partida, :aposta_folha
  has_one :partida, serializer: PartidaSerializer
end
