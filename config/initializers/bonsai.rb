ENV['ELASTICSEARCH_URL'] = 'http://qc2ooju7:kf4r894sjxej8zza@aralia-5547434.us-east-1.bonsai.io'

# Optional, but recommended: use a single index per application per environment.
# Caveat: This convention not be entirely supported throughout Tire's API.
app_name = Rails.application.class.parent_name.underscore.dasherize
app_env = Rails.env
INDEX_NAME = "#{app_name}-#{app_env}"