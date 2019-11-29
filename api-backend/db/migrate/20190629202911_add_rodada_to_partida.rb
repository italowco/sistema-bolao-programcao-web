class AddRodadaToPartida < ActiveRecord::Migration[5.1]
  def change
    add_reference :partidas, :rodada, foreign_key: true
  end
end
