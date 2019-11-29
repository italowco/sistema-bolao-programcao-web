class Partida < ApplicationRecord
  belongs_to :rodada
  belongs_to :mandante, :class_name => 'Team'
  belongs_to :visitante, :class_name => 'Team'
  scope :rodada, -> (rodada_id) { where rodada_id: rodada_id }
end
