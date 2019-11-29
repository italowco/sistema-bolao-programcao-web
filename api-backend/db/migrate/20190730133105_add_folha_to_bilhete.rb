class AddFolhaToBilhete < ActiveRecord::Migration[5.1]
  def change
    add_reference :bilhetes, :aposta_folha, foreign_key: true
  end
end
