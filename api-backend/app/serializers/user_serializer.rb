class UserSerializer < ActiveModel::Serializer
  attributes :id, :profile, :email, :name
end
