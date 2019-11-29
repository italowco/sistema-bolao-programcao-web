class AddValorBilheteToRodada < ActiveRecord::Migration[5.1]
  def change
    add_column :rodadas, :valor_bilhete, :integer

  end
end
