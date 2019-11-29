class ApostaFolha < ApplicationRecord
  scope :rodada, -> (rodada_id) { where rodada_id: rodada_id }
  has_many :bilhetes, dependent: :delete_all
  belongs_to :user
end
