class Bilhete < ApplicationRecord
  scope :rodada, -> (rodada_id) { where rodada_id: rodada_id }
  belongs_to :partida, :class_name => 'Partida'
  belongs_to :aposta_folha
end
