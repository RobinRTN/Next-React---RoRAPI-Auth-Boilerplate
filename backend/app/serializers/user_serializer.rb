class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :username, :picture_number
end
