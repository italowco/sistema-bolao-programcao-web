class Rodada < ApplicationRecord
  has_many :partidas, dependent: :delete_all
end
