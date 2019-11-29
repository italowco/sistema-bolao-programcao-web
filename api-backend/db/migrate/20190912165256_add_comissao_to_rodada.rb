class AddComissaoToRodada < ActiveRecord::Migration[5.1]
  def change
    add_column :rodadas, :comissao, :decimal
  end
end
