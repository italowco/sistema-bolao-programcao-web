Rails.application.routes.draw do
  resources :aposta_folhas
  resources :bilhetes
  resources :resultados
  resources :partidas
  resources :rodadas
  resources :items
  resources :users
  resources :teams
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'authenticate', to: 'authentication#authenticate'
  post 'authenticate', to: 'authentication#register'
  post 'rodada/partidas', to: 'partidas#batch_create'

end
