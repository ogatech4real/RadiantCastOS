"""init

Revision ID: 0001_init
Revises: 
Create Date: 2025-12-22T23:38:27.663936Z
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0001_init"
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        "stations",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False, unique=True),
        sa.Column("encoder_key_hash", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("hls_url", sa.String(length=512), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_stations_slug", "stations", ["slug"], unique=True)

    op.create_table(
        "playlists",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("station_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("stations.id"), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("description", sa.String(length=512), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_playlists_station_id", "playlists", ["station_id"])

    op.create_table(
        "rotation_rules",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("station_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("stations.id"), nullable=False),
        sa.Column("version", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("rules_json", postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_rotation_rules_station_id", "rotation_rules", ["station_id"])

    op.create_table(
        "station_events",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("station_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("stations.id"), nullable=False),
        sa.Column("type", sa.String(length=80), nullable=False),
        sa.Column("payload", postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_station_events_station_id", "station_events", ["station_id"])
    op.create_index("ix_station_events_type", "station_events", ["type"])

    op.create_table(
        "station_runtime_state",
        sa.Column("station_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("stations.id"), primary_key=True, nullable=False),
        sa.Column("desired_source", sa.String(length=16), nullable=False, server_default="autodj"),
        sa.Column("current_source", sa.String(length=16), nullable=False, server_default="autodj"),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )

def downgrade() -> None:
    op.drop_table("station_runtime_state")
    op.drop_index("ix_station_events_type", table_name="station_events")
    op.drop_index("ix_station_events_station_id", table_name="station_events")
    op.drop_table("station_events")
    op.drop_index("ix_rotation_rules_station_id", table_name="rotation_rules")
    op.drop_table("rotation_rules")
    op.drop_index("ix_playlists_station_id", table_name="playlists")
    op.drop_table("playlists")
    op.drop_index("ix_stations_slug", table_name="stations")
    op.drop_table("stations")
